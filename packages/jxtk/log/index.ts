import { JLogger } from './logger.js'
import NodeConsoleReporter from './reporters/NodeConsoleReporter.js'
import AutoTagTransformer from './transformers/AutoTagTransformer.js'
import NodePrettyTransformer from './transformers/NodePrettyTransformer.js'

export function createLogger(appName = '') {
  const logger = new JLogger(appName)
  logger.addReporter(new NodeConsoleReporter())
  logger.addTransformer(new AutoTagTransformer())
  logger.addTransformer(new NodePrettyTransformer())
  return logger
}
